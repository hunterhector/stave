import React, {useState} from 'react';
import './style.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Viewer from './pages/Viewer';
import Projects from './pages/Projects';
import Project from './pages/Project';
import Users from './pages/Users';
import BurgerMenu from './components/burgerMenu';
import {singlePack} from './mock-data-2';
import {ontology} from './mock-config-data';
//import { layout } from './layout';
import {projectConfig} from './project_config';
import NLPViewer from '../nlpviewer';
import groupPlugin from '../plugins/group/Group';
import dialogueBoxPlugin from '../plugins/dialogue_box/DialogueBox';
import AccountMenu from './components/accountMenu';

function App() {
  /*
   * Top level router. Switch between viewer mode and full mode.
   * "viewer" page is the same as the "documents" page except that it
   * does not have the burger menu.
   */
  return (
    <Router>
      <Switch>
        <Route path="/viewer/:id">
          <Viewer />
        </Route>
        <Route path="/">
          <FullMode />
        </Route>
      </Switch>
    </Router>
  );
}

function FullMode() {
  /*
   * Full mode app with burger menu.
   */
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <header className="layout_header">
        <BurgerMenu open={open} setOpen={setOpen}>
          <Link to="/users">All Users</Link>
          <Link to="/projects">All Projects</Link>
        </BurgerMenu>
        <AccountMenu></AccountMenu>
      </header>

      <Switch>
        <Route path="/login">
          <Login />
        </Route>

        <Route path="/signup">
          <SignUp />
        </Route>

        <Route path="/users">
          <Users />
        </Route>

        <Route path="/documents/:id">
          <Viewer />
        </Route>

        <Route path="/projects">
          <Projects />
        </Route>

        <Route path="/project/:id">
          <Project />
        </Route>

        <Route path="/">
          <Projects />
        </Route>
      </Switch>
    </div>
  );
}

function ViewWithDemoData() {
  return (
    <NLPViewer
      textPack={singlePack}
      ontology={ontology}
      plugins={[groupPlugin, dialogueBoxPlugin]}
      projectConfig={projectConfig}
    />
  );
}

let EntryComponent = App;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
if (process.env.REACT_APP_IS_DEMO === ('true' as any)) {
  EntryComponent = ViewWithDemoData;
}

export default EntryComponent;
