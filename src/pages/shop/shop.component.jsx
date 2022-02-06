import React from "react";
import { Route, Routes } from "react-router-dom";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";


import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import CollectionsPageContainer from "../collection/collection.container";


import "./shop.styles.scss";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";

class ShopPage extends React.Component {

  componentDidMount() {
    const {fetchCollectionsStart} = this.props;
    fetchCollectionsStart();
  }
 
  render() {
    return <ShopPageComponent />;
  }
}

const ShopPageComponent = () => {
  let params = useParams();
  return (
    <div className="shop-page">
      <Routes>
        <Route path="" element={<CollectionsOverviewContainer />} />
        <Route
          path={":categoryId"}
          element={<CollectionsPageContainer categoryId={params["*"]} />}
        />
      </Routes>
    </div>
  );
};


const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: collectionsMap => dispatch(fetchCollectionsStart(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);
