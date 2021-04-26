import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
import * as SecureStore from 'expo-secure-store';


export const fetchRobots = () => (dispatch) => {
  dispatch(robotsLoading());

  return fetch(baseUrl + 'robots')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
      error => {
        var errmess = new Error(error.message);
        console.log("erreur 2: errmess");

        throw errmess;
      })
    .then(response => response.json())
    .then(robots => dispatch(addRobots(robots)))
    .catch(error => dispatch(robotsFailed(error.message)));
}

export const robotsLoading = () => ({
  type: ActionTypes.ROBOTS_LOADING
});

export const robotsFailed = (errmess) => ({
  type: ActionTypes.ROBOTS_FAILED,
  payload: errmess
});

export const addRobots = (robots) => ({
  type: ActionTypes.ADD_ROBOTS,
  payload: robots
});

export const fetchPatients = () => (dispatch) => {
  dispatch(patientsLoading());

  return fetch(baseUrl + 'patients')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      })
    .then(response => response.json())
    .then(patients => dispatch(addPatients(patients)))
    .catch(error => dispatch(patientsFailed(error.message)));
}

export const patientsLoading = () => ({
  type: ActionTypes.PATIENTS_LOADING
});

export const patientsFailed = (errmess) => ({
  type: ActionTypes.PATIENTS_FAILED,
  payload: errmess
});

export const addPatients = (patients) => ({
  type: ActionTypes.ADD_PATIENTS,
  payload: patients
});

export const loginUser = (creds) => (dispatch) => {
  // We dispatch requestLogin to kickoff the call to the API
  dispatch(requestLogin(creds))
  console.log("creds in loginUSer API :"+ JSON.stringify(creds))

  return fetch(baseUrl + 'users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',
    },
    body: JSON.stringify(creds)
  })
    .then(response => {
      if (response.ok) {
        console.log("ERRORRRRR 00000000000000000")

        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        console.log("ERRORRRRR 1111111111111111111111111111")
        throw error;
      }
    },
      error => {
        console.log("ERRORRRRR 2222222222222222222222222")

        throw error;
      })
    .then(response => response.json())
    .then(response => {
      if (response.success) {
        console.log("responseToken: "+response.token )
        // If login was successful, set the token in local storage
        //localStorage.setItem('token', response.token);
        //localStorage.setItem('creds', JSON.stringify(creds));
        //localStorage.setItem('userRole', response.userRole);
        // Dispatch the success action
        SecureStore.setItemAsync('token',response.token)
        .then((userToken)=>{
          //console.log("token : "+userToken)
          SecureStore.getItemAsync('token')
          .then((userT)=>{
            console.log("userT: "+userT)
          })
        .catch((error) => console.log('Could not save user token', error));
          
        })
        .catch((error) => console.log('Could not save user token', error));
        SecureStore.setItemAsync('creds',JSON.stringify(creds))
        .catch((error) => console.log('Could not save user creds', error));
        SecureStore.setItemAsync('userRole',response.userRole)
        .catch((error) => console.log('Could not save user role', error));
        
        dispatch(receiveLogin(response));
        console.log("----------------------------");
        console.log("Login Successful");
        console.log("user role : " + response.userRole);
        console.log("----------------------------");

      }
      else {
        var error = new Error('Error ' + response.status);
        error.response = response;
        throw error;
      }
    })
    .catch(error => dispatch(loginError(error.message)))
};
export const requestLogin = (creds) => {
  return {
    type: ActionTypes.LOGIN_REQUEST,
    creds
  }
}

export const receiveLogin = (response) => {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    token: response.token
  }
}

export const loginError = (message) => {
  return {
    type: ActionTypes.LOGIN_FAILURE,
    message
  }
}


export const fetchUsers = () => (dispatch) => {
  dispatch(usersLoading());

  return fetch(baseUrl + 'users')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
      error => {
        var errmess = new Error(error.message);
        console.log("erreur 2: errmess");

        throw errmess;
      })
    .then(response => response.json())
    .then(robots => dispatch(addUsers(robots)))
    .catch(error => dispatch(usersFailed(error.message)));
}

export const usersLoading = () => ({
  type: ActionTypes.USERS_LOADING
});

export const usersFailed = (errmess) => ({
  type: ActionTypes.USERS_FAILED,
  payload: errmess
});

export const addUsers = (users) => ({
  type: ActionTypes.ADD_USERS,
  payload: users
});

export const postDeactivatePatient = (patientId) => (dispatch) => {
  console.log("patientID"+patientId)
  return fetch(baseUrl + 'patients/' + patientId  +'/deassignRobot', {
    method: "POST",
    body: '',
    headers: {
      'Content-Type':'application/json'
    },
    credentials: "same-origin"
  })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
      error => {
        throw error;
      })
    .then(response => response.json())
    .then(() => { console.log("Patient Desactivated"); })
    .catch(error => {console.log("Patient Desactivated"+ error.message)})
    //dispatch(favoritesFailed(error.message))
}

/*
export const fetchUser = (userId) => (dispatch) => {
  dispatch(usersLoading());

  return fetch(baseUrl + 'users')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
      error => {
        var errmess = new Error(error.message);
        console.log("erreur 2: errmess");

        throw errmess;
      })
    .then(response => response.json())
    .then(robots => dispatch(addUsers(robots)))
    .catch(error => dispatch(usersFailed(error.message)));
}
*/


export const fetchRobotGo = (robotId) => (dispatch) => {
  return fetch(baseUrl + 'robots/' + robotId+ '/RobotGo')

  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })

  .then(response => response.json())
  .then(() => { console.log('Order GO Success!'); })
  .catch(error =>{console.log("Order GO Fail!"+ error.message)})
}

export const fetchRobotCome = (robotId) => (dispatch) => {
  return fetch(baseUrl + 'robots/' + robotId+ '/RobotCome')

  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })

  .then(response => response.json())
  .then(() => { console.log('Order COME Success!'); })
  .catch(error =>{console.log("Order COME Fail!"+ error.message)})
}

export const fetchRobotStop = (robotId) => (dispatch) => {
  return fetch(baseUrl + 'robots/' + robotId+ '/RobotStop')

  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })

  .then(response => response.json())
  .then(() => { console.log('Order STOP Success!'); })
  .catch(error =>{console.log("Order STOP Fail!"+ error.message)})
}

export const postPatient = (values) => (dispatch) => {
  return fetch(baseUrl + 'users/createPatient', {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
  })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })
  .then(response => response.json())
  .then(response => { console.log('Patient', response);})
  .catch(error =>  { console.log('Patient', error.message);})
};

export const postNurse = (values) => (dispatch) => {
  return fetch(baseUrl + 'users/createNurse', {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
  })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })
  .then(response => response.json())
  .then(response => { console.log('Nurse', response);})
  .catch(error =>  { console.log('Nurse', error.message);})
};

/*export const postDeactivatePatient=(patientId)=>{
  // POST request using fetch with error handling
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'  },
  };
  fetch(baseUrl+patientId+'/deassignRobot', requestOptions)
      .then(async response => {
          const data = await response.json();
          // check for error response
          if (!response.ok) {
              // get error message from body or default to response status
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
          }
          this.setState({ postId: data.err })
      })
      .catch(error => {
          this.setState({ errorMessage: error.toString() });
          console.error('There was an error!', error);
      });
  }*/

  export const fetchPatientsNotActive = () => (dispatch) => {
  
    return fetch(baseUrl + 'users/PatientIsNotActive')
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
        error => {
          var errmess = new Error(error.message);
          console.log("erreur 2: errmess");
  
          throw errmess;
        })
      .then(response => response.json())
      .then(users => dispatch(addInactiveUsers(users)))
     //.catch(error => dispatch(robotsFailed(error.message)));
  }

  export const addInactiveUsers = (users) => ({
    type: ActionTypes.ADD_INACTIVEUSERS,
    payload: users
  });


  
export const requestLogout = () => {
  return {
    type: ActionTypes.LOGOUT_REQUEST
  }
}

export const receiveLogout = () => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS
  }
}

// Logs the user out
export const logoutUser = () => (dispatch) => {
  console.log("logged out")
  dispatch(requestLogout())
  SecureStore.deleteItemAsync('token')
  SecureStore.deleteItemAsync('creds')
  SecureStore.deleteItemAsync('userRole')
  dispatch(receiveLogout())
}


export const fetchCorrespondingPatient = (robotId) => (dispatch) => {
  //dispatch(patientsLoading());
  //alert("robotID: "+ robotId)
  return fetch(baseUrl +'robots/'+robotId+ '/getCorrespondingPatient')
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
      error => {
        var errmess = new Error(error.message);
        console.log("erreur 2: errmess");

        throw errmess;
      })
    .then(response => response.json())
    .then(patient => dispatch(addCorrespondingPatient(patient)))
    .catch(error => dispatch(patientsFailed(error.message)));
}

export const addCorrespondingPatient = (patient) => {
  return {
    type: ActionTypes.ADD_CORRESPONDINGPATIENT,
    payload:patient
  }
}


export const fetchCorrespondingUser = (robotId) => (dispatch) => {
  //dispatch(patientsLoading());
  alert("robotID: "+ robotId)
  alert("fetna bl fetch")
  return fetch(baseUrl +'robots/'+robotId+ '/getCorrespondingUser')
    .then(response => {
      if (response.ok) {
        console.log("response from server: " + JSON.stringify(response))
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
      error => {
        var errmess = new Error(error.message);
        console.log("erreur 2: errmess");

        throw errmess;
      })
    .then(response => response.json())
    .then(patient => dispatch(addCorrespondingUser(patient)))
    .catch(error => dispatch(usersFailed(error.message)));
}

export const addCorrespondingUser = (user) => {
  return {
    type: ActionTypes.ADD_CORRESPONDINGUSER,
    payload:user
  }
}



export const postAssign = (values) => (dispatch) => {
  return fetch(baseUrl + 'users/AssignRobot' , {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      'Content-Type':'application/json'
    },
    credentials: "same-origin"
  })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
      error => {
        throw error;
      })
    .then(response => {response.json()})
    .then(() => { console.log("Activated"); })
    .catch(error => {console.log("Activated Error"+ error.message)})
}