import { useSelector } from 'react-redux'

export default function Protected({ children }) {
    const user = useSelector(state => state.auth.user);

    if (user) {
        return children;
    }
    else {
        return;
    }
}