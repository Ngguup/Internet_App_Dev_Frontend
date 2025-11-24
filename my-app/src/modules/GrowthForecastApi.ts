import { dest_api } from '../../target_config'
// export interface DataGrowthFactor {
//   wrapperType: string;
//   artworkUrl100: string;
//   artistName: string;
//   collectionCensoredName: string;
//   trackViewUrl: string;
//   collectionId: number;
// }

export interface DataGrowthFactor {
	ID:          number;                            
	Title:       string;      
	Image:       string;                   
	Coeff:       number;              
	Description: string;   
	Attribute: string;                
	IsDelete:    boolean;   
}

export type DataGrowthFactorResult = DataGrowthFactor[];

export interface CartInfoResult {
  growth_request_id: number;
	service_count:     number;
}


export const getDataGrowthFactorsByFilter = async (title = "", minCoeff = "", maxCoeff = "") =>
  fetch(`${dest_api}/api/data-growth-factors?title=${title}&min_coeff=${minCoeff}&max_coeff=${maxCoeff}`)
    .then(r => r.json());

export const getDataGrowthFactorById = async (id: number | string) =>
  fetch(`${dest_api}/api/data-growth-factors/${id}`).then(r => r.json());

export const getCartInfo = async () =>
  fetch(`${dest_api}/api/growth-requests/cart`).then(r => r.json());
