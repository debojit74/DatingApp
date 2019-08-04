namespace DatingApp.API.Helpers
{
    public class UserParams
    {
        public const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int PageSize = 10;
        public int PageSize
        {
            get { return PageSize }
            set { PageSize = (value > MAxPageSize) ? MaxPageSize : value; }
        }
        
    }
}