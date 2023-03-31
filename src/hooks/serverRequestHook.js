import {useQuery} from "@tanstack/react-query";

const useCustomRequest = (key, callback) => {
    let content;
    console.log(key, callback, 'key, callback');
    const {isLoading, isError, error, data} = useQuery(key, callback)
    
    if (isLoading) {
        content = (<h1>Loading...</h1>)
    }
    
    if (isError) {
        content = (<h1>Error: {error.message}</h1>)
    }
    
    if (data) {
        content = JSON.stringify(data);
    }
    
    return content;
}

export default useCustomRequest;