import React from "react";
import { Route, Routes } from "react-router-dom";
import { useParams } from "react-router-dom";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";

import './shop.styles.scss';

const ShopPage = () => {
  let params = useParams();
  return (
    <div className="shop-page">
      <Routes>
        <Route path="" element={<CollectionsOverview />} />
        <Route path={":categoryId"} element={<CollectionPage categoryId={params['*']} />} />
      </Routes>
    </div>
  );
};

export default ShopPage;
