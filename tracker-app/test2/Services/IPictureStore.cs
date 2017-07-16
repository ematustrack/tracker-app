using System;
using System.Collections.Generic;
using System.Threading.Tasks;
namespace test2
{
    public interface IPictureStore<T>
    {
        Task<bool> AddItemAsync(T item);
        Task<PicItem> UpdateItemAsync(string st, string folio, string note, T item);
        Task<bool> DeleteItemAsync(T item);
        Task<T> GetItemAsync(string id);
        Task<IEnumerable<T>> GetItemsAsync(bool forceRefresh = false);
        Task<bool> SendPicItemAsync(PicItem item);

    }
}