import React ,{useEffect,useState}from "react";
import axios from 'axios';
import '../lib/style/log.css';
import { Navigate } from 'react-router-dom';
import NavbarAdmin from "./navbaradmin";
import BarChart from "./BarChart";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faUsers , faMicrophone, faMusic} from '@fortawesome/free-solid-svg-icons';
import PieChart from "./PieChart";

function Admin(){
    const [userCount, setUserCount] = useState(null);
    const [podcastCount, setPodcastCount] = useState(null);
    const [trackCount, setTrackCount] = useState(null);
    const [users, setUsers] = useState([]);
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const [activeUsers,setActiveUsers]=useState([]);
    const [topPodcasts,setTopPodcasts]=useState([]);
    useEffect(() => {
      axios
        .get('http://localhost:5000/users/user/profile', {
          withCredentials: true,
        })
        .then((result) => {
          if ((result.data.success) &&(result.data.user.role=="admin") ) {
            setProfile(result.data.user);
          } else {
            setError('Failed to get profile');
          }
        })
        .catch((err) => {
          console.error(err);
          setError('Failed to get profile');
        });
    }, []);

    //initilisation du barchart (courbe des utilsateurs)
    const [userTopFive,setUsersTopFive]=useState({
      labels: [],
      datasets:[
        {label:" Top active users  ",
          data:[],
          backgroundColor:["#009688"]
        }
      ]
    });
    
    useEffect(() => {
      if (activeUsers && activeUsers.length > 0) {
        setUsersTopFive({
          labels: activeUsers.map((data)=>data.name),
          datasets:[
            {label:"Top active users ",
              data:activeUsers.map((data)=>data.numPodcasts),
              backgroundColor:["#009688"]
            }
          ]
        });
      }
    }, [activeUsers]);
      //initilsation pie chart 
    const [podcastTopFive,setPodcastTopFive]=useState({
      labels: [],
      datasets:[
        {label:" Most viewed podcasts ",
          data:[],
          backgroundColor:["#009688","orange","#367D65","#C66600","#00B0C2"]
        }
      ]
    });
    
    useEffect(() => {
      if (topPodcasts && topPodcasts.length > 0) {
        setPodcastTopFive({
          labels: topPodcasts.map((data)=>data.title),
          datasets:[
            {label:" Most viewed Podcasts ",
              data:topPodcasts.map((data)=>data.views),
              backgroundColor:["#009688","orange","#367D65","#C66600","#00B0C2"]
            }
          ]
        });
      }
    }, [activeUsers]);


   //recupere top 5 utlisateues actives 
    useEffect(() => {
      async function fetchActiveUsers() {
        const response = await axios.get('http://localhost:5000/users/top-active-users');
      //  console.log(response.data,"result ");
        setActiveUsers(response.data);
      }
      fetchActiveUsers();
    }, []);

    //recuperer top5 podcasts 
    useEffect(() => {
      async function fetchTopPodcasts() {
        const response = await axios.get('http://localhost:5000/podcast/most-viewed-podcasts');
    //    console.log(response.data,"result of podcasts");
        setTopPodcasts(response.data);
      }
      fetchTopPodcasts();
    }, []);

    //users count 
    useEffect(() => {
        async function fetchUserCount() {
          const response = await axios.get('http://localhost:5000/users/users/count');
          setUserCount(response.data.count);
        }
        fetchUserCount();
      }, []);

        // podcast count 
      useEffect(() => {
        async function fetchPodcastCount() {
          const response = await axios.get('http://localhost:5000/podcast/count');
          setPodcastCount(response.data.count);
        }
        fetchPodcastCount();
      }, []);
      //track count 
      useEffect(() => {
        async function fetchTrackCount() {
          const response = await axios.get('http://localhost:5000/track/count');
          setTrackCount(response.data.count);
        }
        fetchTrackCount();
      }, []);
      
      //route mettre à jour alerts 
      useEffect(() => {
        async function updateAlerts() {
          const response = await axios.put('http://localhost:5000/users/update-alerts');
         // console.log(response.data);
        }
        updateAlerts();
      }, []);
      
      
 
    
  if (error) {
    // Rediriger l'utilisateur vers la page d'accueil s'il y a une erreur
    return <Navigate to="/" />;
  }

  if (!profile) {
    // Si l'utilisateur n'a pas encore été chargé, on affiche un message de chargement
    return <div>Loading...</div>;
  }


    return( <section> 
        <NavbarAdmin/>
        <div style={{ display: "flex" , justifyContent: "space-around" }}>
        <div style={{ backgroundColor: "#f1f1f1", padding: "20px", borderRadius: "10px",width:"300px",marginLeft:"30px",height:"150px",marginRight: "30px"}}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
      <FontAwesomeIcon icon={faUsers}  style={{fontSize:"25px", marginRight:"20px"}}  />
        <h2 style={{ margin: "0" }}> Total Users</h2>
      </div>
      <p style={{ fontSize: "24px", fontWeight: "bold", margin: "0" }}>{userCount !== null ? ` ${userCount}` : 'Loading...'}</p>
    </div>

    <div style={{ backgroundColor: "#f1f1f1", padding: "20px", borderRadius: "10px",width:"300px",height:"150px",marginRight: "30px"}}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
      <FontAwesomeIcon icon={faMicrophone}  style={{fontSize:"25px", marginRight:"20px"}} />
        <h2 style={{ margin: "0" }}>Total Podcasts</h2>
      </div>
      <p style={{ fontSize: "24px", fontWeight: "bold", margin: "0" }}>{podcastCount !== null ? ` ${podcastCount}` : 'Loading...'}</p>
    </div>

    <div style={{ backgroundColor: "#f1f1f1", padding: "20px", borderRadius: "10px",width:"300px",height:"150px"}}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
      <FontAwesomeIcon icon={faMusic}  style={{fontSize:"25px", marginRight:"20px"}} />
        <h2 style={{ margin: "0" }}>Total Tracks</h2>
      </div>
      <p style={{ fontSize: "24px", fontWeight: "bold", margin: "0" }}>{trackCount !== null ? ` ${trackCount}` : 'Loading...'}</p>
    </div>
    </div>

    <div style={{display: 'flex', flexDirection: 'row'}}>
  <div style={{width: 700, marginTop: 30, marginLeft: 20}}>
    <BarChart chartData={userTopFive}/>
  </div>
  <div style={{width: 400, marginTop: 30, marginLeft: "250px"}}>
    <PieChart chartData={podcastTopFive}/>
  </div>
</div>

 

        </section>)
}
export default Admin;