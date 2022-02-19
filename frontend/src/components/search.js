const Search = () => {
    return(
        <form action="/" method="get">
            <input
                type="text"
                id="session-search"
                placeholder="Enter your session code here"
                name="s" 
            />
            <button type="submit">Join</button>
        </form>
    )
}

export default Search;