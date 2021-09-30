
import {
    BrowserRouter ,
    Switch,
    Route,
} from "react-router-dom";
import Home from './page/home';
import Detail from './page/detail';

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/detail/:id" component={Detail} />
            </Switch>
        </BrowserRouter>
    );
}
export default App;
