

router1.post(
    "/selected_language", async (req, res) => {

     
  });
  
const user= await User.findOne({},'user_id');
user.languages.push(l_id);