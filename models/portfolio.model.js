const mongodb = require("mongodb");

const db = require("../data/database");

class Portfolio {
  constructor(portfolioData) {
    this.companyName = portfolioData.companyName;
    this.serviceType = portfolioData.serviceType;
    this.images = portfolioData.images;
    this.description = portfolioData.description;
    this.date = portfolioData.date;
    this.imgUrl = portfolioData.imgUrl;

    if (portfolioData._id) {
      this.id = portfolioData._id.toString();
    }
  }

  static async findById(portfolioId) {
    let portId;

    try {
      portId = new mongodb.ObjectId(portfolioId);
    } catch (err) {
      err.code = 404;
      throw err;
    }

    const portfolio = await db
      .getDb()
      .collection("portfolios")
      .findOne({ _id: portId });

    if (!portfolio) {
      const error = new Error("Could not find a portfolio with that ID!");
      error.code = 404;
      throw error;
    }

    return new Portfolio(portfolio);
  }

  static async findAll() {
    const portfolios = await db
      .getDb()
      .collection("portfolios")
      .find()
      .toArray();

    return portfolios.map(function (portfolioDocument) {
      return new Portfolio(portfolioDocument);
    });
  }

  replaceImages(newImages){
    this.images = newImages;
    this.imgUrl = `/portfolios/assets/images/${this.images[0].filename}`;
  }


  async save() {
    const portfolioData = {
      companyName: this.companyName,
      serviceType: this.serviceType,
      images: this.images,
      description: this.description,
      date: new Date().toLocaleDateString('en-GB'),
    }
    
    
    if (this.id) {
        const portId = new mongodb.ObjectId(this.id);
        
        if (this.images == undefined) {
            delete portfolioData.images;
            delete portfolioData.imgUrl;
        }else{
            portfolioData.imgUrl = `/portfolios/assets/images/${this.images[0].filename}`;

        }

        
        await db
        .getDb()
        .collection("portfolios")
        .updateOne({ _id: portId }, { $set: portfolioData, });
        return;
    }else {

        portfolioData.imgUrl = `/portfolios/assets/images/${this.images[0].filename}`,
    await db.getDb().collection('portfolios').insertOne(portfolioData);
    }
  }

  async remove(){
    console.log('deleting item with ID: '+ this.id);
    const portfolioId = new mongodb.ObjectId(this.id);
   return db.getDb().collection('portfolios').deleteOne({_id: portfolioId });
  }
}

module.exports = Portfolio;
