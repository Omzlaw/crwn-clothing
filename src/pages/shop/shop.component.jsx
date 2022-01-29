import React from "react";
import { Route, Routes } from "react-router-dom";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import WithSpinner from "../../components/with-spinner/with-spinner.component"

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

import {
  firestore,
  collection,
  getDocs,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";

import "./shop.styles.scss";
import { updateCollections } from "../../redux/shop/shop.actions";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionsPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {

  state = {
    loading: true
  }

  unsubscribeFromSnapshot = null;

  async componentDidMount() {
    const {updateCollections} = this.props
    const collectionRef = collection(firestore, "collections");
    const snapshot = await getDocs(collectionRef);
    const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    updateCollections(collectionsMap);
    this.setState({loading: false})
  }

  render() {
    const {loading} = this.state;
    return <ShopPageComponent loading={loading} />;
  }
}

const ShopPageComponent = ({loading}) => {
  // const {loading} = this.props
  let params = useParams();
  return (
    <div className="shop-page">
      <Routes>
        <Route path="" element={<CollectionsOverviewWithSpinner isLoading={loading} />} />
        <Route
          path={":categoryId"}
          // element={<CollectionPage categoryId={params["*"]} />}
          element={<CollectionsPageWithSpinner isLoading={loading} categoryId={params["*"]} />}
        />
      </Routes>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateCollections: collectionsMap =>
    dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
