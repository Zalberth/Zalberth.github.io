### Objective C的内存管理是基于引用计数
> 你分配的（alloc）对象，或者是保留（retain）在一些地方的对象，都需要给他们发送一个release消息。这也意味着，如果你使用了一次alloc，然后又retain了一次，那么你需要release两次才能释放该对象的内存。