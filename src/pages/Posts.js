import React from "react";
import { Card } from "reactstrap";
import { Link } from "react-router-dom";
import moment from "moment";
const Posts = ({ post }) => {
  return (
    <div className="row">
      <div className="col-10 offset-1">
        <Card className="card-stats">
          <div className="row p-4">
            <div className="col-3 blog-img-container">
              <img src={post.images[0]} alt="Picture" className="card-img" />
              <Link to={`/admin/blog/${post.id}/edit`} className="edit-icon">
                <i className="icon fas fa-edit text-warning"></i>
              </Link>
            </div>
            <div className="col-9">
              <h4 className="pt-0 mt-0">{post.title}</h4>
              <p className="text-muted">
                {moment(new Date(post.createdAt.seconds * 1000)).fromNow()}
              </p>
              <p>{`${post.description.substring(0, 250)}.....`}</p>
              <Link to={`/admin/blog/${post.id}`}>Read More</Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default Posts;
