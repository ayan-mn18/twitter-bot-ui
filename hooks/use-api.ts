import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { useToast } from "./use-toast";

type Props = {
  url: string;
  headers?: any;
  data?: any;
  method: "GET" | "POST";
  successToastTitle?: string
  successToastDesc?: string
};

type ApiResponse = {
  status: boolean;
  statusCode: number;
  message: string;
  data?: any;
};

export const useApi = ({ url, headers = {}, data = {}, method, successToastDesc = "", successToastTitle = "Success" }: Props) => {
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const {toast} = useToast();

  // useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const config: AxiosRequestConfig = {
          url,
          method,
          headers,
          ...(method === "POST" && { data }),
        };

        const res = await axios(config);
        setResponse(res.data);
        toast({
          title: successToastTitle,
          description: successToastDesc,
        })
      } catch (err: any) {
        const errorResponse: ApiResponse = err?.response?.data || {
          status: false,
          statusCode: 500,
          message: "An unexpected error occurred",
        };
        setError(errorResponse.message);
        toast({
          title: "Invalid",
          description: errorResponse.message,
          variant: "destructive"
        })
      } finally {
        setLoading(false);
      }
    };

    // fetchData();
  // }, [url, headers, data, method]);

  return { response, error, loading, fetchData };
};


// sample success response
// {
//   "status": true,
//   "statusCode": 200,
//   "message": "Username is available on GitHub & not registered for twitter bot",
//   "data": {
//       "username": "hkirat",
//       "validUsername": true
//   }
// }