
const dummy = (blogs) => {
    return 1
}


const totalLikes = (blogs) => {
    return blogs.length === 0
        ? 0
        : blogs.reduce(function (sum, blog) {
            return sum + blog.likes
        }, 0)
}

const favouriteBlog = (blogs => {
    let maxLikesBlog
    if (blogs.length > 0) {
        maxLikesBlog = blogs[0]
    } else {
        return 0
    }
    for (let i = 0; i < blogs.length; i++) {
        let blog = blogs[i]
        if (blog.likes > maxLikesBlog.likes) {
            maxLikesBlog = blog
        }
    }
    const blog = {
        title: maxLikesBlog.title,
        author: maxLikesBlog.author,
        likes: maxLikesBlog.likes
    }

    return (
        blog
    )
})



module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}


