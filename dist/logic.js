class WooferManger {
    constructor() {
        this.UsersPosts = []
    }
    async getPostFromDb() {
        return $.ajax({
            method: "GET",
            url: `/posts`,
            success: (response) => {
                 this.UsersPosts = response
            },
        })
    }

    async savePostInDB(post){
        $.ajax({
            method:"POST",
            url:"/posts",
            data:{post},
            success:(response)=>{
                console.log(response)
            }
        })

    }
    async deletePostFromDB(deletePost){
       deletedPost= this.UsersPosts.find(p=>p.user===userName);
       $.ajax({
        method:"DELETE",
        url:"/posts",
        data:{deletePost}, 
        success:(response)=>{
        }
        
       })
    }

    async saveCommentInDB(comment){
        $.ajax({
            method:"POST",
            url:"/comment",
            data:{post},
            success:(response)=>{
                console.log(response)
            }
        })

    }
    



}