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

export const getDataGrowthFactorsByFilter = async (title = "", minCoeff = "", maxCoeff = ""): Promise<DataGrowthFactorResult> => {
  return fetch(`http://localhost:8080/api/data-growth-factors?title=${title}&min_coeff=${minCoeff}&max_coeff=${maxCoeff}`).then(
    (response) => response.json()
  );
};

export const getDataGrowthFactorById = async (
  id: number | string
): Promise<DataGrowthFactor> => {
  return fetch(`http://localhost:8080/api/data-growth-factors/${id}`).then(
    (response) => response.json()
  );
};

export const getCartInfo = async (): Promise<CartInfoResult> => {
  return fetch(`http://localhost:8080/api/growth-requests/cart`).then(
    (response) => response.json()
  );
};