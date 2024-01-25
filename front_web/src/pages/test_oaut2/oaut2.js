import { useEffect, useState } from "react";

// import axios from "axios";

// async function GetData(url, setData) {
//   try {
//     const response = await axios.get(url);
//     console.log(response.data);
//     setData(response.data);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// }

// async function PostData(url, data, setData) {
//   try {
//     await axios.post(url, data);
//     console.log('Data + ')
//     console.log(data)
//     console.log(' created successfully');
//     await GetData(url, setData);
//   } catch (error) {
//     console.error('Error creating data:', error);
//   }
// }

// export { GetData, PostData };

// function Oauth2() {
//   const [allTweets, setAllTweets] = useState([]);
  // useEffect(() => {
  //   // Function to parse URL parameters
  //   function parseURLParams(url) {
  //     const params = {};
  //     const paramStrings = url.substring(1).split('&');
  //     for (const param of paramStrings) {
  //       const [key, value] = param.split('=');
  //       params[key] = decodeURIComponent(value);
  //     }
  //     return params;
  //   }

  //   // Get the URL hash fragment
  //   const hashFragment = window.location.hash;

  //   // Extract the token information
  //   const tokenInfo = parseURLParams(hashFragment);

  //   // Access the extracted values
  //   const accessToken = tokenInfo.access_token;
  //   const tokenType = tokenInfo.token_type;
  //   const expiresIn = tokenInfo.expires_in;
  //   const scope = tokenInfo.scope;

  //   // Log the extracted values (you can use them as needed)
  //   console.log("Access Token:", accessToken);
  //   console.log("Token Type:", tokenType);
  //   console.log("Expires In:", expiresIn);
  //   console.log("Scope:", scope);

  //   const googleData = { accessToken, tokenType, expiresIn, scope };
  //   PostData("https://api.area.tal-web.com/auth/google/callback", googleData, setAllTweets);
  //   // You can now use these values within your component or perform any other necessary actions.
  // }, []);

//   const testAPI = () => {
//     GetData("https://api.rea.tal-web.com/auth/google/calendar", setAllTweets);
//     console.log(allTweets);
//     GetData("https://api.area.tal-web.com/auth/google/calendar2", setAllTweets);
//   }

//   return (
//     <div className="bg-[rgb(36,36,36)] text-white h-screen snap-y snap-mandatory overflow-y-scroll overflow-x-hidden z-0
//     scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-darkBlue/80">
//       <button onClick={
//         () => {
//           window.location.href = "https://area.tal-web.com/";
//         }
//       }>Test API</button>
//     </div>
//   );
// }

// export default Oauth2;