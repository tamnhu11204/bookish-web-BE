const UserRouter=require('./UserRouter')
const ProductRouter = require('./ProductRouter')
const ProvinceRouter = require('./ProvinceRouter')
const DistrictRouter = require('./DistrictRouter')
const CommuneRouter = require('./CommuneRouter')
const LanguageRouter = require('./OptionRouter/LanguageRouter')
const UnitRouter = require('./OptionRouter/UnitRouter')
const FormatRouter = require('./OptionRouter/FormatRouter')
const PublisherRouter = require ('./OptionRouter/PublisherRouter')
const ListAddressRouter = require ('./ListAddressRouter')
const PromotionRouter = require ('./PromotionRouter')
const ShopProfileRouter = require ('./ShopProfileRouter')

const routes=(app) =>{
    app.use('/api/user', UserRouter)
    app.use('/api/product', ProductRouter)
    app.use('/api/district', DistrictRouter)
    app.use('/api/province', ProvinceRouter)
    app.use('/api/commune', CommuneRouter)
    app.use('/api/language', LanguageRouter)
    app.use('/api/unit', UnitRouter)
    app.use('/api/format', FormatRouter)
    app.use('/api/publisher',PublisherRouter)
    app.use('/api/listAddress',ListAddressRouter)
    app.use('/api/promotion',PromotionRouter)
    app.use('/api/shop-profile',ShopProfileRouter)
}

module.exports=routes;