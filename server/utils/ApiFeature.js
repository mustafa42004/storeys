class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  // filter queries
  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["fields", "sort", "page", "limit"];
    excludedFields.forEach((field) => delete queryObj[field]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  // sort queries
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  // select field queries
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  search() {
    return this;
  }
}

module.exports = ApiFeatures;
