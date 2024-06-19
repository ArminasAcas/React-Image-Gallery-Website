export const userSearchData = {
    setSearchData: (title:string, tags:string, startDate:Date, endDate:Date, user:string) => {
        localStorage.setItem("title", title);
        localStorage.setItem("tags", tags);
        localStorage.setItem("startDate", JSON.stringify(startDate));
        localStorage.setItem("endDate", JSON.stringify(endDate));
        localStorage.setItem("user", user);
    },

    getSearchData: () => {
        const title = localStorage.getItem("title");
        const tags = localStorage.getItem("tags");
        const startDate = JSON.parse(localStorage.getItem("startDate")!);
        const endDate = JSON.parse(localStorage.getItem("endDate")!);
        const user = localStorage.getItem("user");
        return { title, tags, startDate, endDate, user };
    },
    removeSearchData: () => {
        localStorage.removeItem("title");
        localStorage.removeItem("tags");
        localStorage.removeItem("startDate");
        localStorage.removeItem("endDate");
        localStorage.removeItem("user");
    }
}
