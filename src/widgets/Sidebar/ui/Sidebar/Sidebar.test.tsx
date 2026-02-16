import { fireEvent, screen } from '@testing-library/react'
import { renderWithTranslation }
    from 'shared/lib/tests/renderWithTranslation/renderWithTranslation';
import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
    test('with only first param', () => {
        renderWithTranslation(<Sidebar />)
        expect(screen.getByTestId('sidebar')).toBeInTheDocument()
    })

    test('test togglr', () => {
        renderWithTranslation(<Sidebar />)
        fireEvent.click(screen.getByTestId('button'))

        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed')
    })
})
