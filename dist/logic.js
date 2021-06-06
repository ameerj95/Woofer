

class WooferManger {
    constructor() {
        this.UsersPosts = []

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
            data: data_id,
            success: (response) => {
                console.log(response)
                getPostFromDb()
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
                console.log(response)
                getPostFromDb()
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
                getPostFromDb()

            }

        })
    }

///////// regster Logic///////////////
async regsterUserInDB(user){
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
login(user){
    $.ajax({
        method:"POST",
        url:'logIn',
        data: user,
        success: (response) => {
            console.log(response)

        }
    })
}

////////////////////////hashtagLogic Optional//////////


}