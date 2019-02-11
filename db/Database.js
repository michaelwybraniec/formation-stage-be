var Database = {
    // ============= DATA =============
    users: [],
    articles: [],

    // ============= FUNCTIONS =============



    addUser: function (user) {

        user.id = this.users.length + 1;
        // TODO : ADD UNIQUE ID TO USER
        if (user) this.users.push(user);
    },

    getUser: function (username) {
        for (var i = 0; i < this.users.length; i++) {
            var user = this.users[i];
            if (user.username === username) {
                return user;
            }
        }
    },



    getUserByID: function (id) {
        for (var i = 0; i < this.users.length; i++) {
            var user = this.users[i];
            if (user.id == id) {
                return user;
            }
        }
    },


    getArticleByID: function (id) {
        for (var i = 0; i < this.articles.length; i++) {
            var article = this.articles[i];
            if (article.id == id) {
                return article;
            }
        }
        // return this.articles[id-1]; // shorter way but if you delete first index the id in the object at the index 0 will be 2 as it was previously at the index 1 before deleting
    },


    nmberOfArticles: function (userId) {
        var articles = this.getArticlesFrom(userId);
        return articles.length;
    },
    


    addArticle: function (article) {
        article.id = this.articles.length + 1;
        // TODO : ADD UNIQUE ID TO ARTICLE
        if (article) this.articles.push(article);
    },



    getLastArticle: function () {
        if (this.articles.length > 0) return this.articles[this.articles.length - 1];
        else return null;
    },



    getArticlesFrom: function (userId) {
        var userArticles = [];
        for (var i = 0; i < this.articles.length; i++) {
            if (this.articles[i].ownerId === userId) {
                userArticles.push(this.articles[i]);
            }
        }
        return userArticles;
    }



};



module.exports = Database;