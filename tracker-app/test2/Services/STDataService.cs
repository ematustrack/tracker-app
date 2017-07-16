﻿﻿using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace test2
{
    public class STDataService : ISTDataService<ST>
	{
		HttpClient client;
		string url;
		public STDataService()
		{
			client = new HttpClient();
			client.MaxResponseContentBufferSize = 256000;
            client.Timeout = TimeSpan.FromMinutes(3);
			url = @"https://f7969f44.ngrok.io";
		}

		public Task<bool> AddItemAsync(ST item)
		{
			throw new NotImplementedException();
		}

		public Task<bool> DeleteItemAsync(ST item)
		{
			throw new NotImplementedException();
		}

		public Task<ST> GetItemAsync(string id)
		{
			throw new NotImplementedException();
		}


		public async Task<IEnumerable<ST>> GetSTItemsAsync(bool forceRefresh = false)
		{
			var uri = new Uri(string.Format(url, string.Empty));
			
            //System.Diagnostics.Debugger.Break();
            var response = await client.GetAsync(uri+"server/getSTFolios/");
            Console.WriteLine(uri + "server/getSTFolios/");
            Console.WriteLine("GetItemsAsync!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            Console.WriteLine("STATUS CODE " +response.IsSuccessStatusCode);
            Console.WriteLine(response);
            if (response.IsSuccessStatusCode)
			{
				var content = await response.Content.ReadAsStringAsync();
                Console.WriteLine(content);
                var Item = JsonConvert.DeserializeObject<List<ST>>(content);
                Console.WriteLine("HERE IS ---> " + Item.ToString());
				return Item;

			}
			return new List<ST>();
		}

		public Task<bool> UpdateItemAsync(ST item)
		{
			throw new NotImplementedException();
		}

        public Task<bool> AddItemAsync(Folio item)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UpdateItemAsync(Folio item)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteItemAsync(Folio item)
        {
            throw new NotImplementedException();
        }


    }
}
