

class WooferManger {
    constructor() {
        this.UsersPosts = []
        this.userName;
        this.userId;
    }

    /////////////createUser///////////
    async creatUser() {

        const newUser = {
            name: "mosahassuna",
            email: "mosahass@gmail.com",
            posts: [],
            isConnected: true,
            bio: "we hope it will work at the end "

        }

      $.ajax({
            method: "POST",
            url: "/user",
            data: newUser,
            success: (response) => {
                console.log("_______-",response)
                this.userId=response._id;
                this.userName=response.name;
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
    ///////////////////  post Logic///////////////////////////
    async savePostInDB(post) {

        $.ajax({
            method: "POST",
            url: "/posts",
            data: post,
            success: (response) => {

                console.log(response)
            }
        })
    }


    async deletePostFromDB(data_id) {
        $.ajax({
            method: "DELETE",
            url: "/posts",
            data: {postId:data_id},
            success: (response) => {
                console.log(response)
                this.getPostFromDb()
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
                console.log("___comment podt res__-_",response)
                this.getPostFromDb()
            }
        })

    }

    async deleteCommentFromDB(data_id) {
        $.ajax({
            method: "DELETE",
            url: "/comment",
            data: data_id,
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