import toast from 'react-hot-toast';

const useFetch = () => {
  const fetchRequest = async (path: string, method: string, data = null) => {
    const baseURL: string = process.env.REACT_APP_API_URL!;
    const token = localStorage.getItem('auth-token');
    const url = `${baseURL}${path}`;
    const requestOptions: any = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    }
    if (data !== null) requestOptions.body = JSON.stringify(data);
    if (token) requestOptions.headers["Authorization"] = `jwt ${token}`;
    
    const response = await fetch(url, requestOptions);
    if (response.status === 200) {
      return await response.json();
    } else {
      const { errors } = await response.json();
      toast.error(errors[0].message);
      return false;
    }
  }
  return {
    fetch: fetchRequest
  }
}

export default useFetch;