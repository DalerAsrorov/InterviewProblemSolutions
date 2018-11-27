

hello

----

Behavioral Flow Graph:

|---register_button (10)
|    |---register_email (4)
|    |    |---email_already_exists (1)
|    |    |---register_success (3)
|    |---register_facebook (4)
|    |    |---register_success (4)
|    |---dropoff (2)
|---login_button (10)
|    |---login_email (4)
|    |    |---login_success (4)
|    |---login_facebook (4)
|    |    |---login_success (3)
|    |    |---login_failure (1)
|    |---dropoff (2)

Sample Input:
user_id, timestamp, action
100, 1000, A
200, 1003, A
300, 1009, B
100, 1026, B
100, 1030, C
200, 1109, B
200, 1503, A


A = {
  counter: 2,
  children: [B],
  user_id: 100,
  timestamps: 1000,
}
B = {
  counter: 1,
  children: [],
  user_id: 300,
  timestamps: 1000,
}


Sample Output:

Tree from the Input:
|---A (2)
|    |---B (2)
|    |    |---C (1)
|    |    |---A (1)
|---B (1)



--------------
const NODE = {
  count,
  children,
  action,
}

[
  {
    user_id,
    timestamp,
    action
  },
]
  
class Node {
  constructor(counter, user_id, children = [], timestamps = []) {
    this.counter = counter;
    this.user_id = user_id;
    this.timestamps = timestamps;
    this.children = children;
  }  
}

const findUserAction = (actions, userId) => {
  for (let i = 0; i < actions.length; i++){
    if (actions[i].user_id === userId){
       return actions[i];
    }
  }
}


const buildFlowGraph = (samples) => {
  let actions = {};
  
  for (let i = 0; i < samples.length; i++) {
    const {user_id, timestamp: newTimestamp, action} = samples[i]; // (count, user_id, timestamp)
    
    if (!actions[action]) {
      actions[action] = new Node(1, user_id, [], [newTimestamp]);
    } else {
      let action = actions[action];
      let counter = action.counter + 1;
      let timestamps = action.timestamps;
      const children = action.children;
      
      // to build children, we should check if
      // the user id is in actions and timestamp > last timestamp from that action
      const userAction = findUserAction(actions, user_id);
      const myTimestamps = userAction ? userAction.timestamp : null;
      const lastTimestamp = myTimestamps[myTimestamps.length - 1];
      
      if (userAction && lastTimestamp < timestamp) {
          action.children.push(action); 
      }
      
      actions[action].counter = counter;
      actions[action].timestamps = [...timestamps, newTimestamp];
    }
  }
  
  return actions;
}

  
  
  
  
  
  
  
  
  
  
  
  
  
  