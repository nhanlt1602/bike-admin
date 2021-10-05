import * as React from "react";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export default function StandardImageList() {
    return (
        <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
            {itemData.map((item) => (
                <ImageListItem key={item.img}>
                    <img
                        src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.title}
                        loading="lazy"
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
}

const itemData = [
    {
        img: "http://thammybsdungnhatrang.vn/images/bang-cap/bang-cap%20(1).jpg",
        title: "Breakfast",
    },
    {
        img: "https://lh3.googleusercontent.com/proxy/jj86hqKylmWOmsSUcXpvkIOOIIIKxTKVgAjrx2uSeOQlKnQN17JiCkcKWH4HvanO1XXA8h9zJwvD4cq14esM-cHjMgNSzjY1t_YWCF6Scf7IVSuY71shsUAKqjheiuYSGGy89c_dc5XPMU8OVO6zO1Lhj5_zo8jXE9FaEOY",
        title: "Burger",
    },
];
