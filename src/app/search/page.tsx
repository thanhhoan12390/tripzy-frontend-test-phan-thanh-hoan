async function Search({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const params = await searchParams;

    console.log(params);

    return <div>Search page</div>;
}

export default Search;
