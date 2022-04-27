/**
Company Controllers

getAll()

Parameters:
Description: returns all companies inside the database
Authentication: not required
Example: /api/company

getOne()

Parameters: name
Description: returns company matches this name
Authentication: not required
Example: /api/company/Brimore

getMany()

Parameters: stacks[] in query string
Description: returns companies that have this stack in stackList
Authentication: not required
Example: /api/company/companies/stacks?stacks[]=Javascript&stacks[]=Java

createOne()

Parameters: request body (company attributes)
Description: creates a company
Authentication: required

updateOne()

Parameters: company's id, company's name, attributes to be updated
Description: updates a company
Authentication: required

removeOne()

Parameters: models's name
Description: removes a company matching this name
Authentication: required
Example: /api/company/6183dcbd835c31a77ab91b86

*/
import { Company } from './company.model'
import { crudControllers } from '../.././utils/crud'
import { SetOrGetCompanyCache } from '../.././utils/redis/redisClient';

const GetByPriority = model => async (req, res) => {
    let { page=1, size=9 } = req.query;
    size = parseInt(size);
    page = parseInt(page);
    //Number of records we are going to skip, if we are in page 1, we are going to skip zero pages
    try {
        const doc = await SetOrGetCompanyCache(`companies-${page}-${size}`, async () => {
            const query = await model
                .find({})
                .limit(size*1)
                .skip((page-1)*size)
                .sort({ p: -1, _id:1 }) //Sort by priority descendingly and id asendingly -check the pagination issue for more details-
                .lean()
                .exec()
            return query;
        })
        if (!doc)
        {
            return res.status(404).end()
        }
        res.status(200).json({page:page, size:size, data: doc })
    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
}
//TEST CASES
/**
 *                                  INPUT -- EXPECTED OUTPUT
 * empty name - first page 9 companies
 * capital case name - company matching this name
 * small case name - company matching this name
 * small and capital case name - company matching this name
 * name not in the database - 404 not found
 */
const GetByName = model => async (req, res) => {
    try {
        const slug= req.params.slug;
        if(!slug)
        {
            const page =1;
            const size=9;
            const doc = await SetOrGetCompanyCache(`companies-${page}-${size}`, async () => {
                const query = await model
                    .find({})
                    .limit(size*1)
                    .skip((page-1)*size)
                    .sort({ p: -1, _id:1 }) //Sort by priority descendingly and id asendingly -check the pagination issue for more details-
                    .lean()
                    .exec()
                return query;
            })
            return res.status(200).json({page:page, size:size, data: doc })
        }
        const doc = await model
            .find({
                $or: [
                    { name: { $regex: `^${slug}`, $options: 'i' } },
                    { slug: { $regex: `^${slug}`, $options: 'i' } }
                ]
            })
            .sort({ p: -1, _id:1 })
            .lean()
            .exec()
        if (!doc) {
            return res.status(404).end()
        }
        res.status(200).json({ data: doc })
    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
}
//TEST CASES
/**
 *                                  INPUT -- EXPECTED OUTPUT
 * empty stackList -- all data
 * one element stackList -- companies that contain this element
 * two elements stackList -- companies that contains these elements
 * maximum stackList -- companies that contains these elements
 * stackList all capital case -- companies that contains these elements
 * stackList all small case -- companies that contains these elements
 * stackList capital case and small case -- companies that contains these elements
 * stackList (does not exist in the database) -- 404 not found 
 * 
 */
const GetByStack = model => async (req, res) => {
    try {
        const stackList = req.query.stacks
        //Implementing case-insenstive search on an array
        //O(N) complexity perhaps, need to find better solution
        var inSensitiveStackList = []
        stackList.forEach(element => {
            var inSensitiveStack = RegExp(`^${element}$`, 'i')
            inSensitiveStackList.push(inSensitiveStack)
        });
        /**
         * $all operator retrieves all the documents which contains the subset of the values we pass. The subset might be in any order.
         * $in operator retrieves all the documents which contains the either of the values we pass.
         */
        const doc = await model
            .find({ stacks: { $all: inSensitiveStackList } })
            .sort({ p: -1, _id:1 })
            .lean()
            .exec()
        if (!doc) {
            return res.status(404).end()
        }
        res.status(200).json({ data: doc })
    } catch (e) {
        console.error(e)
        res.status(400).end()
    }
}

const CreateCompany = model => async (company, req, res, next) => {
    try {
        if (company instanceof Error) {
            next(company)
        }
        else {
            const doc = await model.create({ ...req.body })
            res.status(201).json({ data: doc })
        }
    } catch (e) {
        console.error(e)
        next(e)
    }
}

const CompaniesController = model => ({
    ...crudControllers(model),
    getByStack: GetByStack(model),
    getByName: GetByName(model),
    getByPriority: GetByPriority(model),
    createCompany: CreateCompany(model)
})
export default CompaniesController(Company)