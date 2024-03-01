type FlickrPhoto = {
  id: string;
  secret: string;
  server: string;
  title: string;
};

export async function getImages(searchCriteria: string) {
  return fetch(
    `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=b80455bd18a1449116a3516a7859a645&text=${searchCriteria}&safe_search=1&content_type=1&per_page=15&page=1&format=json&nojsoncallback=1`
  )
    .then((response) =>
      response.json().then((response) => {
        if (response.stat === "fail") return response.message;

        const {
          photos: { photo: photos },
        } = response;
        const sizeSuffix = "q";

        //   Mutate the data to the format I want.
        return photos.map(({ id, secret, server, title }: FlickrPhoto) => ({
          title,
          url: `https://live.staticflickr.com/${server}/${id}_${secret}_${sizeSuffix}.jpg`,
        }));
      })
    )
    .catch(({ message }) => message);
}
