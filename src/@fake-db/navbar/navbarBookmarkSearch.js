import mock from "../mock"

export const searchResult = [
  {
    id: 1,
    target: "HomePage",
    title: "صفحه اصلی",
    link: "/",
    icon: "Home",
    starred: true
  },
  {
    id: 2,
    target: "Profile",
    title: "مشخصات فردی",
    link: "/personal-info",
    icon: "User",
    starred: true
  },
  {
    id: 3,
    target: "MyEvents",
    title: "رویداد های من",
    link: "/my-events",
    icon: "Layers",
    starred: true
  },
  {
    id: 4,
    target: "Notification",
    title: "اعلانات",
    link: "/notifications",
    icon: "MessageCircle",
    starred: true
  },
  {
    id: 5,
    target: "Business",
    title: "کسب و کار",
    link: "/work-info",
    icon: "Briefcase",
    starred: false
  },
  {
    id: 6,
    target: "Comments",
    title: "مشاهده نظرات",
    link: "/received-comments",
    icon: "MessageSquare",
    starred: false
  },
  {
    id: 7,
    target: "Trade",
    title: "تراکنش های مالی",
    link: "/trade-info",
    icon: "DollarSign",
    starred: false
  },
 
]

mock.onGet("/api/search/bookmarks/data").reply(200, {
  searchResult
})

mock.onPost("/api/update/bookmarks").reply(request => {
  const bookmarkToUpdate = JSON.parse(request.data).obj

  searchResult.filter(i => {
    if (i.id === bookmarkToUpdate.id) {
      return (i.starred = !bookmarkToUpdate.starred)
    } else {
      return null
    }
  })
  return [200]
})
