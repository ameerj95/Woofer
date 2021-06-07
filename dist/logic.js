class WooferManger {
    constructor() {
        this.UsersPosts = []
        this.userName;
    }
    //
    initUser(username){
        this.userName = username
    }
    //Create user
    async creatUser() {
        const userName = $("#userNameInput").val()
        const email = $("#emailInput").val()
        const password = $("#passInput").val()
        const bio = $("#bioInput").val()
        const newUser = {
            name: userName,
            email: email,
            posts: [],
            isConnected: true,
            bio: bio,
            password : password
        }
        $.ajax({
            method: "POST",
            url: "/user",
            data: newUser,
            success: (response) => {
                this.initUser(response.name)
            }
        })

    }

    //Get post
    async getPostFromDb() {
        return $.ajax({
            method: "GET",
            url: `/posts`,
            success: (response) => {
                this.UsersPosts = response

            },
        })

    }
   
    //Save post
    async savePostInDB() {
        const postText = $('#postInput').val()
        const newPost = {
            user: this.userName,
            text: postText,
            likes: [],
            comments: [],
            userId: this.userId
        }
        $.ajax({
            method: "POST",
            url: "/posts",
            data: newPost,
            success: (response) => {
                this.getPostFromDb()
            }
        })
    }
     
    //Delete post
    async deletePostFromDB(data_id) {
        $.ajax({
            method: "DELETE",
            url: "/posts",
            data: { postId: data_id },
            success: (response) => {
                 this.getPostFromDb()
            }
        })
    }

    //Save comment
    async saveCommentInDB(userName, postId, commentText) {
        const newComment = {
            user: userName,
            text: commentText,
            postId: postId
        }
        $.ajax({
            method: "POST",
            url: "/comment",
            data: newComment,
            success: (response) => {
                this.getPostFromDb()
            }
        })
    }

    //Delete comment
    async deleteCommentFromDB(data_id) {
       return $.ajax({
            method: "DELETE",
            url: "/comment",
            data: {commentId:data_id},
            success: (response) => {
                this.getPostFromDb()
            }
        })
    }

    //Login
    async login() {
        const email = $(`#loginUserInpt`).val()
        const password = $(`#loginPwInpt`).val()
        return $.ajax({
            method: "POST",
            url: '/login',
            data: {email: email , password :password},
            success: (response) => {
                if(response != false){
                    this.initUser(response.name)
                }
                else{
                    this.initUser(false)
                }
            }
        })
    }
        //this function gets friends and returns it
        async getFriends() {
            return $.ajax({
                method: "get",
                url: '/getFriends',
            })
        }
        //-------------------------------------------------------------------------
        //this function gets hashed posts
        async getSearchedHash() {
            var hashInput = $("#hashInput").val()
            return $.ajax({
                method: "get",
                url: `/getHashed/${hashInput}`,
            })
        }
        //-------------------------------------------------------------------------
        //this function gets hashed posts
        async getUser(username) {
            return $.ajax({
                method: "get",
                url: `/user/${username}`,
            })
        }
        //-------------------------------------------------------------------------
        async logout(){
            return $.ajax({
                method: "get",
                url: `/logout`,
            })
        }
        //-------------------------------------------------------------------------
        async updateProfile(){
            var name = $("#userNameInput").val()
            var email = $("#emailInput").val()
            var bio = $("#bioInput").val()
            return $.ajax({
                method: "put",
                url: `/user`,
                data:{name:name,email:email,bio:bio},
            })
        }
}