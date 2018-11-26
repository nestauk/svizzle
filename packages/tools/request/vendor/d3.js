export * from "d3-fetch";

// clashes with d3-fetch methods, used if Fetch isn't supported
export {
    text as textRequest,
    json as jsonRequest
} from "d3-request";
