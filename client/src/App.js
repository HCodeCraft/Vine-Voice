import './App.css';
import { Route, Routes } from "react-router-dom";
import Welcome from './Welcome';
import Login from './features/users/Login';
import CreateAccount from './features/users/CreateAccount';
import AllPlants from './features/plants/AllPlants';
import UserProfile from './features/users/UserProfile';
import EditPlant from './features/plants/EditPlant';
import EditEntry from './features/entries/EditEntry';
import Plant from './features/plants/Plant';
import NewEntry from './features/entries/NewEntry';
import UserPlants from './features/plants/UserPlants';
import NewPlant from './features/plants/NewPlant';
import EditProfile from './features/users/EditProfile';
import Entry from './features/entries/Entry'
import NavBar from './NavBar'

function App() {
  return (
    <>
        <NavBar />
        <Routes>
          <Route path="/" element={<Welcome/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/users/new" element={<CreateAccount/>} />
          <Route path="/plants" element={<AllPlants/>} />
          <Route path="/users/:id" element={<UserProfile/>} />
          <Route path="/plants/:id/edit" element={<EditPlant/>} />
          <Route path="/plants/:plant_id/entries/:id" element={<EditEntry/>} />
          <Route path="/plants/:id" element={<Plant />} />
          <Route path="/plants/:plant_id/entries/:id" element={<Entry />} />
          <Route path="/plants/:plant_id/entries/new" element={<NewEntry/>} />
          <Route path="/users/plants" element={<UserPlants/>} />
          <Route path="/plants/new" element={<NewPlant/>} />
          <Route path="/users/current/edit" element={<EditProfile/>} />
        </Routes>
    </>
  );
}

export default App;
