import React, { useState, useEffect } from "react";
import Loading from "@/components/global/loading/Loading";

interface ProductImageProps {
    imageURL: string;
}

export default function ProductImage({ imageURL }: ProductImageProps) {
    // State for track image loading
    const [imageLoaded, setImageLoaded] = useState<boolean>(true);
    // Handle image loading
    const handleImageLoaded = () => {
        setImageLoaded(false);
    };
    // useEffect for reset imageLoaded state when imageURL changed
    useEffect(() => {
        // Append Image asset URL to imageURL
        // Listen to image load event
        const image = new Image();
        image.src = imageURL;
        image.addEventListener("load", handleImageLoaded);
        // Remove event listener
        return () => {
            image.removeEventListener("load", handleImageLoaded);
        };
    }, [imageURL]);
    return (
        <div
            className={`flex h-[13.98369rem]
w-[10.38731rem] items-center justify-center overflow-hidden ${
                imageLoaded ? "rounded-md border border-black" : ""
            }`}
        >
            {imageLoaded ? (
                <Loading />
            ) : (
                <img
                    src={imageURL}
                    alt="product"
                    className="h-[13.98369rem]
w-[10.38731rem]"
                />
            )}
        </div>
    );
}
