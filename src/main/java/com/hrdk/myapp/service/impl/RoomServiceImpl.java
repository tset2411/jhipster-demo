package com.hrdk.myapp.service.impl;

import com.hrdk.myapp.domain.Room;
import com.hrdk.myapp.repository.RoomRepository;
import com.hrdk.myapp.service.RoomService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Room}.
 */
@Service
@Transactional
public class RoomServiceImpl implements RoomService {

    private final Logger log = LoggerFactory.getLogger(RoomServiceImpl.class);

    private final RoomRepository roomRepository;

    public RoomServiceImpl(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    @Override
    public Room save(Room room) {
        log.debug("Request to save Room : {}", room);
        return roomRepository.save(room);
    }

    @Override
    public Room update(Room room) {
        log.debug("Request to save Room : {}", room);
        return roomRepository.save(room);
    }

    @Override
    public Optional<Room> partialUpdate(Room room) {
        log.debug("Request to partially update Room : {}", room);

        return roomRepository
            .findById(room.getId())
            .map(existingRoom -> {
                if (room.getRoomId() != null) {
                    existingRoom.setRoomId(room.getRoomId());
                }
                if (room.getRoomNumber() != null) {
                    existingRoom.setRoomNumber(room.getRoomNumber());
                }

                return existingRoom;
            })
            .map(roomRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Room> findAll(Pageable pageable) {
        log.debug("Request to get all Rooms");
        return roomRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Room> findOne(Long id) {
        log.debug("Request to get Room : {}", id);
        return roomRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Room : {}", id);
        roomRepository.deleteById(id);
    }
}
