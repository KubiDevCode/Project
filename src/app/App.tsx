import './styles/index.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { Suspense, useEffect } from 'react';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar/inedx';
import { useDispatch, useSelector } from 'react-redux';
import { AppRouter } from './providers/router';
import { userActions } from '../entities/User';
import { getUserInited } from '../entities/User/model/selectors/getUserInited/getUserInited';

const App = () => {
    const dispatch = useDispatch()
    const inited = useSelector(getUserInited)

    useEffect(() => {
        dispatch(userActions.initAuthData())
    }, [dispatch])

    return (
        <div className={classNames('app', {}, [])}>
            <Suspense fallback="">
                <Navbar />
                <div className="content-page">
                    <Sidebar />
                    {inited && <AppRouter />}
                </div>
            </Suspense>
        </div>
    );
};

export default App;
