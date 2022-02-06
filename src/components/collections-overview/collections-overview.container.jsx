import React from "react";
import { connect } from "react-redux";
import { selectCollectionIsFetching } from "../../redux/shop/shop.selectors";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import WithSpinner from "../../components/with-spinner/with-spinner.component"
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";




const mapStateToProps = createStructuredSelector({
    isLoading: selectCollectionIsFetching,
});

const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;