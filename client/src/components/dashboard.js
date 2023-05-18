import React from "react";
import BarChart from "./BarChart";
import Navbarclient from "./navbarclient";
import {useEffect,useState}from "react";
import {UserData} from "./Data";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import axios from 'axios';
export default function Dhashboard(){

    const [podcasts,setPodcasts]=useState();//stocker les podcasts d'utlisateur donnée
    const [profile,setProfile]=useState(); //pour verifier si un utlisateur est connecte ou nn 
    const [Tracks, setTracks] = useState([]); //contenir tous les tracks 
    const [tracksData, setTracksData] = useState([]);// contient tous les tracks d'un podcast 
    const [selectedOption, setSelectedOption] = useState('all'); 
    // fonction de filtrage pour récupérer le top 3 des podcasts en fonction du nombre de vues
const getTop3Podcasts = (podcasts) => {
  const sortedPodcasts = podcasts.sort((a, b) => b.views - a.views);
  return sortedPodcasts.slice(0, 3);
};

// fonction de filtrage pour récupérer le top 10 des podcasts en fonction du nombre de vues
const getTop10Podcasts = (podcasts) => {
  const sortedPodcasts = podcasts.sort((a, b) => b.views - a.views);
  return sortedPodcasts.slice(0, 10);
};

// fonction de filtrage pour récupérer tous les podcasts
const getAllPodcasts = (podcasts) => {
  return podcasts;
};

// fonction de filtrage principale qui appelle la fonction de filtrage appropriée en fonction de l'option sélectionnée
const filterPodcasts = (podcasts) => {
  switch (selectedOption) {
    case 'top3':
      return getTop3Podcasts(podcasts);
    case 'top10':
      return getTop10Podcasts(podcasts);
    default:
      return getAllPodcasts(podcasts);
  }
};

// fonction de gestionnaire d'événements pour mettre à jour l'option sélectionnée
const handleOptionChange = (event) => {
  setSelectedOption(event.target.value);
};

    
    //barchart initilisation des donnees 
    const [userDatap,setUserData]=useState({
      labels: [],
      datasets:[
        {label:"Podcast's views ",
          data:[],
          backgroundColor:["#009688","orange","#367D65","#C66600","#00B0C2"]
        }
      ]
    });
    const filteredPodcasts=filterPodcasts(podcasts);
    useEffect(() => {
     
      if (filteredPodcasts && filteredPodcasts.length > 0) {
        setUserData({
          labels: filteredPodcasts.map((data)=>data.title),
          datasets:[
            {label:"Podcast's views",
              data:filteredPodcasts.map((data)=>data.views),
              backgroundColor:["#009688","orange","#367D65","#C66600","#00B0C2"]
            }
          ]
        });
      }
    }, [selectedOption]);

      //***************************************** */ line chart initilaisation  reprensente nb de view de track 
      const [podcastTracks,setPodcastTracks]=useState({
        labels: [],
        datasets:[
          {label:" Tracks Views  ",
            data:[],
            backgroundColor:["#009688"]
          }
        ]
      });
      
      useEffect(() => {
        if (tracksData && tracksData.length > 0) {
          setPodcastTracks({
            labels: tracksData.map((data)=>data.title),
            datasets:[
              {label:"Tracks Views ",
                data:tracksData.map((data)=>data.nbView),
                backgroundColor:["#009688"]
              }
            ]
          });
        }
      }, [tracksData]);
   
    /********************************* Line chart de temps moyen passe pour chaque track   */
          
    const [tracksAvgTime,setTracksAvgTime]=useState({
      labels: [],
      datasets:[
        {label:" Average listening Time ",
          data:[],
          backgroundColor:["#009688"]
        }
      ]
    });
    
    useEffect(() => {
      if (tracksData && tracksData.length > 0) {
        setTracksAvgTime({
          labels: tracksData.map((data)=>data.title),
          datasets:[
            {label:"Average listening Time ",
              data:tracksData.map((data)=>data.time),
              backgroundColor:["#009688"]
            }
          ]
        });
      }
    }, [tracksData]);


//recuperer les informations du profile
    useEffect(()=>{
        axios.get('http://localhost:5000/users/user/profile',{
            withCredentials: true,
          }).then((result)=>{setProfile(result.data.user)}).catch((err)=>{console.log(err,12)});
    },[])

  console.log(profile);


   //recuperer tous les podcasts d'un utilisateurs connecte 
   useEffect(() => {
    axios.get('http://localhost:5000/podcast/podcasts')
      .then(response => {
        // Filtrer les podcasts en fonction de l'ID de l'utilisateur connecté
        const filteredPodcasts = response.data.filter(podcast => podcast.userId === profile.id);
        setPodcasts(filteredPodcasts);
      })
      .catch(error => {
        console.log(error);
      });
  }, [profile]);
  console.log(podcasts,10000);//afficher rous les podcast d'un utlisateur 




      //recuperer tous les tracks 
      useEffect(() => {
        axios.get('http://localhost:5000/track/tracks') // `${host}track/tracks`
          .then(response => {
            setTracks(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      }, []); 
      console.log("trackss lkol ",Tracks);
     
      // select d'une option ***********************************************************************************

      function handleSelectChange(event) {
       
        const filteredTracks = Tracks.filter(track => track.podcastId === parseInt(event.target.value)).map(track => {
          return {
            title: track.title,
            trackUrl: track.trackUrl,
            id: track.id,
            nbView: track.nbView,
            time: track.listeningTime
          };
        });
        setTracksData(filteredTracks);
      }
    //  console.log(selectedPodcastId,"hedha id mte3 podcast select ");
      console.log(tracksData,"Tracks d'un podcast selectionne  ");



   

    console.log("mes podcasts",podcasts);
    return(
        <div>
            <Navbarclient/>
            <div style={{  width:"80%", display: 'flex', flexDirection: 'column', alignItems: 'center',padding: '16px'  }}>
            <select style={{
          backgroundColor: '#f2f2f2',
          color: '#333',
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '8px',
          width: '100%',
          maxWidth: '400px',
        marginBottom:"80px",
          marginRight:"100px",
          marginLeft:"100px"  ,
         
        }} value={selectedOption} onChange={handleOptionChange}>
              <option value="top3">Top3</option>
              <option value="top10">Top10</option>
              <option value="all">All</option>
            </select>
            <div style={{width:700 }}>
            
            <BarChart chartData={userDatap}/>
      
            
            </div>

             
          
          
          <div  style={{  width:"80%", display: 'flex', flexDirection: 'column', alignItems: 'center',padding: '16px'  }}>
        
      
         {filteredPodcasts ? (
         <select onChange={handleSelectChange}    style={{
          backgroundColor: '#f2f2f2',
          color: '#333',
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '8px',
          width: '100%',
          maxWidth: '400px',
          marginTop:"100px"        
        }}>
             {filteredPodcasts.map((podcast) => (
                <option key={podcast.id} value={podcast.id}>
                         {podcast.title}
                 </option>
            ))}
        </select>
      ) : (
        <p>No podcasts found</p>
      )}
            <div style={{width:700 ,marginTop:"30px"}} >
            <LineChart chartData={podcastTracks}/>
            </div>

           

            <div style={{width:700,marginTop:"100px"}}>
            <LineChart chartData={tracksAvgTime}/>
            </div>

            </div>
            
            </div>
        </div>
    )
}