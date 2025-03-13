import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const ProductApi = createApi({
    refetchOnMountOrArgChange: true,
reducerPath: "ProductApi",
    baseQuery: fetchBaseQuery({
        // baseUrl: `${import.meta.env.BACKEND_API}/`,
        baseUrl: `${process.env.REACT_APP_BACKEND_URL}/`,
        // prepareHeaders: async (headers) => {
        //   headers.set("authorization", `Bearer ${localStorage.getItem("Bearer")}`);
        //   headers.set("X-TENANT-ID", `${localStorage.getItem("tenantId")}`);
        //   return headers;
        // },
        // mode: "no-cors",
      }),
    tagTypes: ["Product"],
    endpoints: (builder) =>{
        return {
    
                // createProduct: builder.mutation({
                //     query: (location) => ({
                //         url: `create`,
                //         method: "POST",
                //         body: location,
                //     }),
                //     invalidatesTags: ["Product"],
                // }),

                getProduct: builder.query({
                    query: () => ({
                        url: `products`,
                        method: "GET",
                        // params:{...params}
                        // body: location,
                    }),
                    providesTags: ["Product"],
                }),
              
            
            
        }

    }
    
   
},);

export const { 
    useGetProductQuery,
} = ProductApi;

