import './App.css';
import { Route, Routes } from "react-router-dom";
import Welcome from './Welcome';
import Login from './Login';
import CreateAccount from './CreateAccount';
import AllPlants from './AllPlants';
import UserProfile from './UserProfile';
import EditPlant from './EditPlant';
import EditEntry from './EditEntry';
import Plant from './Plant';
import NewEntry from './NewEntry';
import UserPlants from './UserPlants';
import NewPlant from './NewPlant';
import EditProfile from './EditProfile';
import Entry from './Entry'

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
