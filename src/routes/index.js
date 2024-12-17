const UserRouter=require('./UserRouter')
const ProductRouter = require('./ProductRouter')
const ProvinceRouter = require('./ProvinceRouter')
const DistrictRouter = require('./DistrictRouter')
const CommuneRouter = require('./CommuneRouter')
const LanguageRouter = require('./OptionRouter/LanguageRouter')
const UnitRouter = require('./OptionRouter/UnitRouter')
const FormatRouter = require('./OptionRouter/FormatRouter')
const PublisherRouter = require ('./OptionRouter/PublisherRouter')

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
}

module.exports=routes;