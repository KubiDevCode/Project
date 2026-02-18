import { fireEvent, screen } from '@testing-library/react'
import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
    test('with only first param', () => {
        componentRender(<Sidebar />)
        expect(screen.getByTestId('sidebar')).toBeInTheDocument()
    })

    test('test togglr', () => {
        componentRender(<Sidebar />)
        fireEvent.click(screen.getByTestId('button'))

        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed')
    })
})
