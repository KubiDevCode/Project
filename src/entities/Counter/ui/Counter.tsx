/* eslint-disable i18next/no-literal-string */
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'shared/ui/Button/Button';
import { StateSchema } from 'app/providers/StoreProvider/config/StateSchema';
import { counterActions } from '../model/slice/counterSlice';
import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue';

interface CountreProps {
    className?: string;
}

export const Counter = () => {
    const dispatch = useDispatch()
    const counterValue = useSelector(getCounterValue)
    const increment = () => {
        dispatch(counterActions.increment())
    }
    const decrement = () => {
        dispatch(counterActions.decrement())
    }

    return (
        <div>
            <h1
                data-testid="value-title"
            >
                value =
                {' '}
                {counterValue}
            </h1>
            <Button
                data-testid="increment"
                onClick={increment}
            >
                increment
            </Button>
            <Button
                data-testid="decrement"
                onClick={decrement}
            >
                decrement
            </Button>
        </div>
    );
};
