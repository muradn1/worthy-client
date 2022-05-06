import { gql, useQuery } from "@apollo/client";
import { Button, ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import { useEffect, useState } from "react";


const GET_DOGS = gql`
query GetSimilars($diamondId:String!) {
    findSimilarDiamonds(diamondId:$diamondId) {
    id
    price
    photo
  }
}
`;

interface SimilarDiamond {
    id: string,
    price: number,
    photo: string
}

export default function ShowSimilarsPopup({ diamondId, onBackClick:handleBackCLick }: { diamondId: string, onBackClick:Function }) {
    const { loading, error, data } = useQuery(GET_DOGS, { variables: { diamondId } });
    const [similarDiamonds, setSimilarDiamonds] = useState([]);

    useEffect(() => {
        if (data) {
            setSimilarDiamonds(data.findSimilarDiamonds)
        }
    }, [data])

    if (loading) return <div>'Loading...'</div>;
    if (error) return <div>`Error! ${error.message}`</div>;



    return (
        <div style={{
            width:"100%",
            height:"100%",
            display:"flex",
            flexDirection:"column",
            alignItems:"center"
        }}>
            <ImageList sx={{ width: "40%", height: "90%" }}>
                {similarDiamonds.map((diamond: SimilarDiamond) => (
                    <ImageListItem key={diamond.id}>
                        {
                            diamond.photo ?
                                <img
                                    src={`http://localhost:3000/images/${diamond.photo}?w=248&fit=crop&auto=format`}
                                    srcSet={`http://localhost:3000/images/${diamond.photo}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    alt={diamond.photo}
                                    loading="lazy"
                                /> :
                                <img
                                    src={`not-found.jpg?w=248&fit=crop&auto=format`}
                                    srcSet={`not-found.jpg?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    alt={"not-found"}
                                    loading="lazy"
                                />
                        }

                        <ImageListItemBar
                            title={diamond.price}
                            subtitle={"Price"}
                            position="below"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
            <Button
                variant="contained"
                sx={{ mt: 3, mb: 2, width:"15" }}
                onClick={()=>{handleBackCLick()}}
              >
                Back To Price
              </Button>
        </div>
    )
}
