

class WooferManger {
    constructor() {
        this.UsersPosts = []
        this.userName;
        this.userId;
    }

    /////////////createUser///////////
    async creatUser(userName,email,bio) {
        const newUser = {
            name: userName,
            email: email,
            posts: [],
            isConnected: true,
            bio: bio,
        }
        $.ajax({
            method: "POST",
            url: "/user",
            data: newUser,
            success: (response) => {
                console.log("___+++++++++____-", response)
                this.userId = response._id;
                this.userName = response.name;
                this.userEmail = response.email;
            }
        })

    }
    ////////////getData////////////
    async getPostFromDb() {
        return $.ajax({
            method: "GET",
            url: `/posts`,
            success: (response) => {
                this.UsersPosts = response

            },
        })

    }
   
    async savePostInDB(postText) {
        const newPost = {
            user: this.userName,
            text: postText,
            likes: [],
            comments: [],
            date: new Date(),
            userId: this.userId
    
        }
        $.ajax({
            method: "POST",
            url: "/posts",
            data: newPost,
            success: (response) => {

                console.log(response)
            }
        })
    }
     
    async deletePostFromDB(data_id) {
        $.ajax({
            method: "DELETE",
            url: "/posts",
            data: { postId: data_id },
            success: (response) => {
                console.log(response)
                // this.getPostFromDb()
            }
        })
    }

    ///////////////////   comment Logic///////////////////////////

    async saveCommentInDB(comment) {
        $.ajax({
            method: "POST",
            url: "/comment",
            data: comment,
            success: (response) => {
                this.getPostFromDb()
            }
        })

    }

    async deleteCommentFromDB(data_id) {
       return $.ajax({
            method: "DELETE",
            url: "/comment",
            data: {commentId:data_id},
            success: (response) => {
                console.log(response)
                this.getPostFromDb()

            }

        })
    }

    ///////// regster Logic///////////////
    async regsterUserInDB(user) {
        $.ajax({
            method: "POST",
            url: "/signUp",
            data: user,
            success: (response) => {
                console.log(response)

            }

        })

    }

    ///// login//////////////////
    login(user) {
        $.ajax({
            method: "POST",
            url: 'logIn',
            data: user,
            success: (response) => {
                console.log(response)

            }
        })
    }

    ////////////////////////hashtagLogic Optional//////////


}