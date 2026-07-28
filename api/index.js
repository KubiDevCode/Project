const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(process.cwd(), 'json-server', 'db.json');

function readDb() {
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
}

function getBody(req) {
    if (!req.body) {
        return {};
    }

    if (typeof req.body === 'string') {
        try {
            return JSON.parse(req.body);
        } catch (e) {
            return {};
        }
    }

    return req.body;
}

function withoutPassword(user) {
    if (!user) {
        return user;
    }

    const { password, ...publicUser } = user;
    return publicUser;
}

function normalizeValue(value) {
    return Array.isArray(value) ? value[0] : value;
}

function getPathSegments(req) {
    const queryPath = normalizeValue(req.query.path);

    if (queryPath) {
        return queryPath.split('/').filter(Boolean);
    }

    const pathname = req.url.split('?')[0].replace(/^\/api\/?/, '');
    return pathname.split('/').filter(Boolean);
}

function filterItems(items, query) {
    const search = normalizeValue(query.q)?.toLowerCase();
    const type = normalizeValue(query.type);

    return items.filter((item) => {
        if (search) {
            const title = String(item.title || '').toLowerCase();
            const subtitle = String(item.subtitle || '').toLowerCase();

            if (!title.includes(search) && !subtitle.includes(search)) {
                return false;
            }
        }

        if (type && Array.isArray(item.type) && !item.type.includes(type)) {
            return false;
        }

        return Object.entries(query).every(([key, value]) => {
            if (key.startsWith('_') || key === 'q' || key === 'type') {
                return true;
            }

            const normalizedValue = normalizeValue(value);
            return String(item[key]) === String(normalizedValue);
        });
    });
}

function sortItems(items, query) {
    const sortBy = normalizeValue(query._sort);
    const order = normalizeValue(query._order) || 'asc';

    if (!sortBy) {
        return items;
    }

    return [...items].sort((a, b) => {
        const first = a[sortBy];
        const second = b[sortBy];

        if (first === second) {
            return 0;
        }

        const result = first > second ? 1 : -1;
        return order === 'desc' ? -result : result;
    });
}

function paginateItems(items, query) {
    const limit = Number(normalizeValue(query._limit));
    const page = Number(normalizeValue(query._page) || 1);

    if (!limit) {
        return items;
    }

    const start = (page - 1) * limit;
    return items.slice(start, start + limit);
}

function expandItems(items, query, db) {
    const expand = normalizeValue(query._expand);

    if (expand !== 'user') {
        return items;
    }

    return items.map((item) => ({
        ...item,
        user: withoutPassword(
            db.users.find((user) => String(user.id) === String(item.userId)),
        ),
    }));
}

function send(res, status, data) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,OPTIONS');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type,Authorization',
    );
    res.status(status).json(data);
}

module.exports = function handler(req, res) {
    if (req.method === 'OPTIONS') {
        return send(res, 200, {});
    }

    const db = readDb();
    const [resource, id] = getPathSegments(req);
    const query = { ...req.query };
    delete query.path;

    if (resource === 'login' && req.method === 'POST') {
        const { username, password } = getBody(req);
        const user = db.users.find(
            (item) => item.username === username && item.password === password,
        );

        if (!user) {
            return send(res, 403, { message: 'User not found' });
        }

        return send(res, 200, withoutPassword(user));
    }

    if (!req.headers.authorization) {
        return send(res, 403, { message: 'AUTH ERROR' });
    }

    const collection = db[resource];

    if (!Array.isArray(collection)) {
        return send(res, 404, { message: 'Not found' });
    }

    if (req.method === 'GET' && id) {
        const item = collection.find((entity) => String(entity.id) === id);

        if (!item) {
            return send(res, 404, { message: 'Not found' });
        }

        return send(
            res,
            200,
            resource === 'users' ? withoutPassword(item) : item,
        );
    }

    if (req.method === 'GET') {
        const result = paginateItems(
            sortItems(filterItems(collection, query), query),
            query,
        );

        return send(res, 200, expandItems(result, query, db));
    }

    if (req.method === 'POST') {
        return send(res, 201, {
            ...getBody(req),
            id: String(Date.now()),
        });
    }

    if ((req.method === 'PATCH' || req.method === 'PUT') && id) {
        const current = collection.find((entity) => String(entity.id) === id);

        if (!current) {
            return send(res, 404, { message: 'Not found' });
        }

        return send(res, 200, {
            ...current,
            ...getBody(req),
        });
    }

    return send(res, 405, { message: 'Method not allowed' });
};
