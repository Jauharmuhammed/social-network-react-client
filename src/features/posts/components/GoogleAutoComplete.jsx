import {usePlacesWidget} from "react-google-autocomplete";

const GoogleAutoComplete = () => {
    const {ref, autocompleteRef} = usePlacesWidget({
        apiKey: process.env.GOOGLE_MAPS_API_KEY,
        onPlaceSelected: (place) => {
            console.log(place);
        },
    });
    return <input ref={autocompleteRef} type="text" className='bg-transparent py-2 outline-none' />;
};

export default GoogleAutoComplete;
