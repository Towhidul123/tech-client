import { FaThumbsUp } from "react-icons/fa";


const ProductsCard = ({ item }) => {

    const { name, image, tags, upvote_count } = item;

    return (
        <div className="mt-5 card card-compact w-50 bg-base-100 shadow-xl">

            <div className="card-body">

                <figure>
                    <img src={image} alt="tech" />
                </figure>
                <h2 className="card-title">{name}</h2>

                <div className="tags">
                    {tags && tags.length > 0 && (
                        tags.map((tag, index) => (
                            <span key={index} className="badge bg-primary text-white mr-2 mb-2">
                                {tag}
                            </span>
                        ))
                    )}
                </div>

                <div className="btn btn-secondary card-actions justify-center items-center">

                    {upvote_count}
                    <FaThumbsUp />

                </div>
            </div>


        </div>
    );
};

export default ProductsCard;